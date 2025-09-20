

const AboutSection = () => {
  const imageUrl = "https://media.licdn.com/dms/image/v2/D4D03AQHf6QIXrXYv_A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725551840288?e=1750896000&v=beta&t=WBxhNfnObqnI_duXIkgkWKIJ-MCE5drHACa9_s9sNvE";
  
  return (
    <div className="about-image about-animate neubrutalism-box glass overflow-hidden rounded-full">
      <img
        src={imageUrl}
        alt="Mayank Agrawal"
        className="w-full h-auto rounded-full border-8"
        style={{ borderColor: 'rgba(255,255,255,0.15)' }}
      />
    </div>
  );
};

export default AboutSection;