import React from 'react';

const AboutSection = () => {
  const imageUrl = "https://media.licdn.com/dms/image/v2/D4D03AQHf6QIXrXYv_A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725551840288?e=1750896000&v=beta&t=WBxhNfnObqnI_duXIkgkWKIJ-MCE5drHACa9_s9sNvE";
  
  return (
    <div className="about-image about-animate neubrutalism-box bg-white overflow-hidden rounded-full">
      <img
        src={imageUrl}
        alt="Mayank Agrawal"
        className="w-full h-auto rounded-full border-8 border-white"
      />
    </div>
  );
};

export default AboutSection;