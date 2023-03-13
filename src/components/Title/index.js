import "./title.css";

export default function Title({ children, name }) {
  return (
    <div className="title">
      {children} {/* Aqui vou exibir o que tem dentro do componente, no profile */}
      <span>{name}</span>
    </div>
  );
}
