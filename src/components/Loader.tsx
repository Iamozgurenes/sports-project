type LoaderProps = {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
};

export default function LoaderComp({ fullScreen = true, size = 'md', text = 'Yükleniyor...' }: LoaderProps) {
  const sizeClass = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-white/70">
        <img
          src="/loading.gif"
          alt={text}
          className={`${sizeClass[size]} object-contain mb-3`}
        />
        {text && <p className="text-gray-600 font-medium animate-pulse">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <img
        src="/loading.gif"
        alt={text}
        className={`${sizeClass[size]} object-contain mb-2`}
      />
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
}