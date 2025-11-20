import * as React from 'react';
import { Html, Body, Head, Heading, Container, Text, Tailwind, Section, Button } from "@react-email/components";

interface EmailTemplateProps {
  senderEmail: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  senderEmail,
  message,
}) => {
  const timestamp = new Date().toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'short' 
  });

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 my-auto mx-auto font-sans">
          <Container className="border-4 border-black my-[40px] mx-auto p-0 max-w-[600px] bg-white shadow-[8px_8px_0px_0px_#000000]">
            {/* Header */}
            <Section className="bg-[#BEF264] border-b-4 border-black p-6">
              <Heading className="text-black text-[28px] font-black uppercase text-center p-0 m-0 tracking-tight">
                📧 New Portfolio Contact
              </Heading>
              <Text className="text-center text-black text-[12px] font-mono mt-2 mb-0">
                {timestamp}
              </Text>
            </Section>

            {/* Sender Info */}
            <Section className="p-6 bg-white">
              <div className="border-3 border-black bg-gray-100 p-4 mb-4">
                <Text className="text-[12px] font-mono font-bold text-black uppercase mb-2 mt-0">
                  👤 Sender Information:
                </Text>
                <div className="bg-white border-2 border-black p-3 font-mono">
                  <Text className="text-[14px] text-black m-0 break-all">
                    <strong>Email:</strong> {senderEmail}
                  </Text>
                </div>
              </div>

              {/* Message Content */}
              <div className="border-3 border-black bg-gray-100 p-4">
                <Text className="text-[12px] font-mono font-bold text-black uppercase mb-2 mt-0">
                  💬 Message:
                </Text>
                <div className="bg-white border-2 border-black p-4">
                  <Text className="text-[15px] leading-[24px] text-black m-0 whitespace-pre-wrap font-sans">
                    {message}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Quick Actions */}
            <Section className="border-t-4 border-black bg-[#FF6B9D] p-6">
              <Text className="text-center text-[12px] font-mono font-bold text-white uppercase mb-3 mt-0">
                Quick Actions:
              </Text>
              <Button
                href={`mailto:${senderEmail}?subject=Re: Portfolio Contact`}
                className="bg-black text-white text-center px-6 py-3 font-bold text-[14px] no-underline border-2 border-white shadow-[4px_4px_0px_0px_#fff] w-full block"
              >
                ↩️ REPLY TO {senderEmail}
              </Button>
            </Section>

            {/* Footer */}
            <Section className="border-t-4 border-black bg-white p-4">
              <Text className="text-center text-[11px] text-gray-600 font-mono m-0">
                Sent via Portfolio Contact Form • kabir-narula.vercel.app
              </Text>
            </Section>

            {/* Corner Accents */}
            <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', backgroundColor: '#BEF264', border: '2px solid black' }} />
            <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '16px', height: '16px', backgroundColor: '#FF6B9D', border: '2px solid black' }} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

