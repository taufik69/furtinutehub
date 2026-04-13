"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, MessageSquare, X, Plus } from "lucide-react";

const WHATSAPP_NUMBER = "8801616785862";
const MESSENGER_USERNAME = "pervejfashion";
const CALL_NUMBER = "01616-785862";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const contacts = [
    {
      name: "WhatsApp",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-[#25D366]",
      link: `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`,
    },
    {
      name: "Messenger",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "bg-[#0084FF]",
      link: `https://m.me/${MESSENGER_USERNAME}`,
    },
    {
      name: "Call Now",
      icon: <Phone className="w-5 h-5" />,
      color: "bg-emerald-500",
      link: `tel:${CALL_NUMBER}`,
    },
  ];

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      {/* Sub Buttons */}
      <div className="flex flex-col items-end gap-3 mb-2">
        {contacts.map((contact, index) => (
          <a
            key={contact.name}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center gap-3 p-3 rounded-full text-white shadow-xl
              transition-all duration-300 transform pointer-events-auto
              hover:scale-110 active:scale-95
              ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 scale-50"}
            `}
            style={{ 
              transitionDelay: `${isOpen ? index * 50 : 0}ms`,
              backgroundColor: contact.name === 'WhatsApp' ? '#25D366' : contact.name === 'Messenger' ? '#0084FF' : '#10b981'
            }}
          >
            <span className={`text-xs font-bold px-2 py-1 rounded ${isOpen ? "inline-block" : "hidden"}`}>
              {contact.name}
            </span>
            {contact.icon}
          </a>
        ))}
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={toggleOpen}
        className={`
          w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl
          transition-all duration-500 transform pointer-events-auto
          hover:scale-105 active:scale-90
          ${isOpen ? "bg-gray-800 rotate-90" : "bg-[#111] hover:bg-gray-900"}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>

      {/* Ripple Effect Animation */}
      {!isOpen && (
        <span className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-[#111] animate-ping opacity-20 pointer-events-none" />
      )}
    </div>
  );
}
