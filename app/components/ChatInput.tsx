import type {ChangeEvent , FormEvent} from "react";
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}


export default function ChatInput({
  value,
  onChange,
  onSend,
}: ChatInputProps) {

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    onChange(event.target.value);
  };

  const handleSubmit = (
    event:FormEvent<HTMLFormElement>

  ) => {
    event.preventDefault();
    onSend();
  }
   const handleKeyDown = (
    event : React.KeyboardEvent<HTMLInputElement>
   )=>{
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      onSend();
    }
   }

  
  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Message AI..."
        className="flex-1 rounded-xl bg-zinc-800 px-4 py-3 outline-none"
      />

      <button
        type="submit"
        className="rounded-xl bg-white px-5 py-3 text-black"
      >
        Send
      </button>
    </form>
  );
}