"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormattedMessage = ({
  text,
  showActions,
}: {
  text: string;
  showActions: boolean;
}) => {
  const sections = text.split(/(?=\*\*[^*]+\*\*:)/).filter(Boolean);

  const handleBuy = () => {
    console.log("Buy clicked");
    // Add your buy logic here
  };

  const handleSell = () => {
    console.log("Sell clicked");
    // Add your sell logic here
  };

  return (
    <div className="space-y-4">
      <div className="prose max-w-none space-y-4">
        {sections.map((section, index) => {
          if (section.startsWith("**")) {
            const [heading, ...content] = section.split("\n");
            const cleanHeading = heading.replaceAll("*", "").trim();
            const cleanContent = content.join("\n").trim();

            if (cleanContent.match(/^\d+\./m)) {
              const steps = cleanContent.split(/(?=\d+\.)/).filter(Boolean);
              return (
                <div key={index} className="space-y-2">
                  <h3 className="font-bold text-lg">{cleanHeading}</h3>
                  <div className="space-y-2 pl-4">
                    {steps.map((step, stepIndex) => {
                      const [stepNum, ...stepContent] = step.trim().split(" ");
                      return (
                        <div key={stepIndex} className="flex gap-2">
                          <span className="font-bold">{stepNum}</span>
                          <div>{stepContent.join(" ")}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="space-y-2">
                <h3 className="font-bold text-lg">{cleanHeading}</h3>
                <p className="text-gray-800">{cleanContent}</p>
              </div>
            );
          }

          return (
            <p key={index} className="text-gray-800">
              {section}
            </p>
          );
        })}
      </div>

      {showActions && (
        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleBuy}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6"
          >
            Buy
          </Button>
          <Button
            onClick={handleSell}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6"
          >
            Sell
          </Button>
        </div>
      )}
    </div>
  );
};

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Ask me about a meme coin", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to count assistant messages
  const getAssistantMessageCount = (messages: Message[]) => {
    return messages.filter((msg) => !msg.isUser).length;
  };

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      setIsLoading(true);
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_query: input,
            history: "",
            pipeline: "chat",
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: data.response, isUser: false },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I encountered an error. Please try again.",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center p-4 border-b-2 border-black">
          <h2 className="text-xl font-bold text-primary">Chat with Minter</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="h-[400px] p-4">
          {messages.map((message, index) => {
            // Calculate if this is the third assistant message
            const assistantCount = getAssistantMessageCount(
              messages.slice(0, index + 1)
            );
            const isThirdAssistantMessage =
              !message.isUser && assistantCount === 3;

            return (
              <div
                key={index}
                className={`mb-4 ${
                  message.isUser ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-xl ${
                    message.isUser
                      ? "bg-primary text-black"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.isUser ? (
                    message.text
                  ) : (
                    <FormattedMessage
                      text={message.text}
                      showActions={isThirdAssistantMessage}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="text-left mb-4">
              <div className="inline-block p-3 rounded-xl bg-gray-100 text-gray-800">
                Thinking...
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t-2 border-black">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
