import React, { useRef } from 'react';
import gsap from 'gsap';

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const sendToTelegram = async (formData: any) => {
    const botToken = '8067211942:AAFCZ4A24rRpXZ9zcertnatlOxQP4FAr-p0';
    const chatId = '5804733110';
    const message = `
New Contact Form Submission:
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Message: ${formData.message}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    await sendToTelegram(formData);
    
    if (formRef.current) {
      gsap.to(formRef.current, {
        y: -10,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(formRef.current, {
            y: 0,
            duration: 0.5,
            ease: 'power2.in',
          });
        },
      });
    }
    
    formRef.current?.reset();
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        {/* Form content would go here */}
      </form>
    </div>
  );
};

export default ContactSection;