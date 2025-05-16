export  default function TitleDesc({title, desc}: {title: string, desc: string}) {
    return (
        <div className="mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 leading-relaxed pb-1">
          {title}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          {desc}
        </p>
      </div>
    )   
}