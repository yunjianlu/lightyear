"use client";
import { useState } from "react";
import { products } from "../product/mockData";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "🤖 Hello! I'm C-3PO, your Star Wars shopping assistant. How may I help you find the perfect item today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const newMessages = [...messages, { type: "user", text: textToSend }];
    setMessages(newMessages);
    setInputValue("");

    // Generate bot response using OpenAI
    const botResponse = await generateBotResponse(textToSend);
    setMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
  };

  // Smart product filtering to reduce token usage
  const filterRelevantProducts = (userMessage, allProducts) => {
    const message = userMessage.toLowerCase();

    // Extract price budget if mentioned
    const priceMatch = message.match(/\$?(\d+)/);
    const budget = priceMatch ? parseInt(priceMatch[1]) : null;

    // Keywords for different product categories
    const keywords = {
      lightsaber: [
        "lightsaber",
        "saber",
        "jedi",
        "sith",
        "luke",
        "vader",
        "kylo",
      ],
      armor: [
        "helmet",
        "mask",
        "armor",
        "mandalorian",
        "vader",
        "stormtrooper",
      ],
      collectibles: ["plush", "toy", "collectible", "grogu", "yoda", "baby"],
      weapons: ["blaster", "weapon", "gun", "staff", "rey"],
      vehicles: ["falcon", "ship", "millennium"],
    };

    let relevantProducts = [];

    // If budget is mentioned, filter by price first
    if (budget) {
      relevantProducts = allProducts.filter((p) => p.price <= budget);
    } else {
      relevantProducts = [...allProducts];
    }

    // Filter by keywords if any category is mentioned
    const mentionedCategories = Object.keys(keywords).filter((category) =>
      keywords[category].some((keyword) => message.includes(keyword))
    );

    if (mentionedCategories.length > 0) {
      relevantProducts = relevantProducts.filter((product) => {
        const productText = `${product.productName} ${
          product.productDescription
        } ${product.category} ${product.tags?.join(" ")}`.toLowerCase();
        return mentionedCategories.some((category) =>
          keywords[category].some((keyword) => productText.includes(keyword))
        );
      });
    }

    // If no specific filtering applied or too few results, return top products
    if (relevantProducts.length === 0) {
      // Return top-rated available products
      relevantProducts = allProducts
        .filter((p) => p.quantityInStock > 0)
        .sort((a, b) => b.starRating - a.starRating)
        .slice(0, 5);
    } else if (relevantProducts.length > 8) {
      // Limit to 8 products to control token usage
      relevantProducts = relevantProducts.slice(0, 8);
    }

    // Return simplified product data (remove unnecessary fields)
    return relevantProducts.map((product) => ({
      productName: product.productName,
      productId: product.productId,
      category: product.category,
      productDescription: product.productDescription,
      price: product.price,
      quantityInStock: product.quantityInStock,
      starRating: product.starRating,
      numberOfReviews: product.numberOfReviews,
      // Removed: productDetails, topReview, tags, relatedProducts to save tokens
    }));
  };

  const generateBotResponse = async (userMessage) => {
    setIsLoading(true);

    try {
      // Smart product filtering to reduce token usage
      const filteredProducts = filterRelevantProducts(userMessage, products);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          products: filteredProducts,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return "Oh dear! I seem to be experiencing some technical difficulties. The odds of this happening are... well, higher than I'd like to admit. Please try again in a moment!";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 left-4 z-50 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 flex items-center gap-2 ${
          isOpen ? "rotate-3" : "hover:scale-105"
        }`}
      >
        <span className="text-xl">{isOpen ? "✕" : "🤖"}</span>
        <span className="text-sm font-medium">{isOpen ? "Close" : "Chat"}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 z-50 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-lg">
            <h3 className="font-semibold flex items-center gap-2">
              🤖 C-3PO Assistant
            </h3>
            <p className="text-xs opacity-90">Star Wars Merchandise Expert</p>
          </div>

          {/* Quick Suggestions */}
          <div className="p-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-600 mb-1">Quick suggestions:</p>
            <div className="flex flex-wrap gap-1">
              {[
                "Lightsabers",
                "Grogu plush",
                "Under $100",
                "Weapons",
                "In stock",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() =>
                    !isLoading &&
                    handleSendMessage(`Show me ${suggestion.toLowerCase()}`)
                  }
                  disabled={isLoading}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-2 rounded-lg text-sm whitespace-pre-line ${
                    message.type === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none p-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      C-3PO is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !isLoading && handleSendMessage()
                }
                placeholder={
                  isLoading ? "C-3PO is thinking..." : "Ask about products..."
                }
                disabled={isLoading}
                className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
