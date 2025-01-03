const AuthImagePattern = ({ title, subtitle }) => {
  const icons = [
    "💬", "🔒", "👻", "📱", "🔔", "✉️", "⚡", "🎯", "⭐"
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {icons.map((icon, i) => (
            <div
              key={i}
              className={`
                aspect-square rounded-2xl 
                bg-gradient-to-tr from-primary/10 to-secondary/10
                hover:scale-105 transition-all duration-300
                flex items-center justify-center text-2xl
                backdrop-blur-sm shadow-lg
                ${i % 2 === 0 ? "animate-bounce" : "animate-pulse"}
              `}
            >
              {icon}
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-base-content/70 text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;