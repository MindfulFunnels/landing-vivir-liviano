import React, { useRef, useState } from "react";

interface RegisterBoxProps {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  buttonText?: string;
  errorEmpty?: string;
  errorEmail?: string;
  errorServer?: string;
  success?: string;
  secureMessage?: string;
}

export default function RegisterBox({
  title = "¡Inscríbete ahora!",
  namePlaceholder = "Tu nombre completo",
  emailPlaceholder = "Tu email",
  buttonText = "Acceder a la clase gratis",
  errorEmpty = "Por favor completa todos los campos",
  errorEmail = "Por favor ingresa un email válido",
  errorServer = "Error del servidor, intenta de nuevo",
  success = "¡Registro exitoso! Redirigiendo...",
  secureMessage = "Tu información está segura con nosotros",
}: RegisterBoxProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessages("");
    setSuccessMessage("");

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";

    if (!name || !email) {
      setErrorMessages(errorEmpty);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages(errorEmail);
      return;
    }

    setIsSubmitting(true);

    const capitalizeFirstLetter = (word: string): string => {
      return word
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    };

    const capitalizedName = capitalizeFirstLetter(name);

    try {
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizedName,
          email: email.toLowerCase(),
        }),
      });

      if (userRes.ok) {
        setSuccessMessage(success);
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      } else {
        setSuccessMessage(success);
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      }
    } catch (error) {
      setErrorMessages(errorServer);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      <form className='flex flex-col gap-6 p-8 glass-card rounded-xl'>
        <h2 className='text-center gradient-text mb-4 text-white'>{title}</h2>

        <input
          ref={nameRef}
          type='text'
          id='name'
          name='name'
          required
          placeholder={namePlaceholder}
          className='w-full p-4 text-lg border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--color-secondary)]'
        />

        <input
          ref={emailRef}
          type='email'
          id='email'
          name='email'
          required
          placeholder={emailPlaceholder}
          className='w-full p-4 text-lg border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--color-secondary)]'
        />

        {errorMessages && (
          <p className='text-red-400 text-sm text-center'>{errorMessages}</p>
        )}

        {successMessage && (
          <p className='text-green-400 text-sm text-center'>{successMessage}</p>
        )}

        {isSubmitting ? (
          <div className='flex justify-center'>
            <div className='w-10 h-10 border-4 border-[color:var(--color-accent)] border-t-transparent rounded-full animate-spin'></div>
          </div>
        ) : (
          <button
            type='submit'
            className='w-full px-10 py-4 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-[color:var(--color-accent)] to-[color:var(--color-primary)] rounded-lg hover:from-[color:var(--color-primary)] hover:to-[color:var(--color-accent)] hover:scale-105'
            onClick={handleSubmit}
          >
            {buttonText}
          </button>
        )}

        <p className='text-center text-sm text-white'>{secureMessage}</p>
      </form>
    </div>
  );
}
