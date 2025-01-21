import { useEffect, useState, useRef } from "react";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import chatLive from "../css/chatLive.module.css";
import  dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime' ;

function Livechat({ game, session }) {
    const [error, setError] = useState("");
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [message, setMessage] = useState("");
    const messagesRef = useRef(null);

    dayjs.extend(relativeTime);

    const scrollSmoothToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    const getInitialMessages = async () => {
        setLoadingInitial(true);
        if (messages.length) return;

        const { data, error } = await supabase
            .from("Messages")
            .select()
            .eq("game_id", game.id);

        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(data);
    };

    useEffect(() => {
        if (!game.id) return;

        getInitialMessages();

        const channel = supabase
            .channel("Messages")
            .on("postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "Messages"
                },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [game.id]);

    if (!session) {
        return <div>Fai il login per usare la chat.</div>;
    }

    if (loadingInitial) {
        return <div>Loading...</div>;
    }

    async function handleMessageSubmit(event) {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        if (typeof message === "string" && message.trim().length !== 0) {
            const { data, error } = await supabase
                .from("Messages")
                .insert([
                    {
                        profile_id: session.user.id,
                        game_id: game.id,
                        content: message,
                        profile_username: session.user.user_metadata.username,
                        created_at: new Date(),
                    }
                ])
                .select();

            if (error) {
                toast.error("Errore invio messaggio!");
            } else {
                toast.success("Messaggio inviato!");
                setMessage("");
                console.log(data, "data");
            }
        }
    }

    return (
        <div className={chatLive.livechatContainer}>
            <div className={chatLive.messagesContainer}> 
                {error && <p>{error}</p>}

                {messages.map((message) => (
                    <div key={message.id} className={chatLive.messageList}>
                        <div className={`${chatLive.message} ${message.profile_id === session.user.id ? chatLive.sent : chatLive.received
                            }`}>
                            <p className={chatLive.textChat}>{message.content}</p>
                            <p className={chatLive.timestamp}>
                                {message.profile_username} <br />
                                {dayjs().to(dayjs(message.created_at))}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesRef} />
            </div>

            <form onSubmit={handleMessageSubmit} className={chatLive.inputContainer}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={chatLive.textarea}
                    placeholder="Scrivi un messaggio..."
                />
                <button type="submit" className={chatLive.sendButton}>
                    Invia
                </button>
            </form>
            <Toaster richColors theme="dark" />
        </div>
    );
}

export default Livechat;