import React from "react";

const socialLinks = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/littlecodr/" },
  { platform: "GitHub", url: "https://github.com/LittleCodr" },
  { platform: "Twitter", url: "https://x.com/mindflayer_69" },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer-animate text-center p-6 glass border-t border-white/10">
      <div className="flex justify-center gap-6 mb-3">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-link transition"
          >
            {link.platform}
          </a>
        ))}
      </div>
      <p className="text-white/70">
        &copy; {new Date().getFullYear()} Mayank Agrawal. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
