export default function LoaderComp ()  {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/70">
        <img
          src="/loading.gif"
          alt="Yükleniyor..."
          className="w-24 h-24 object-contain"
        />
      </div>
    );
  };