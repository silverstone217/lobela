"use client";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { isEmptyString } from "@/utils/functions";
import { Alert } from "../ui/alert";
import { createNewUser, SignupDataType } from "@/actions/auth";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isButtonDisabled = useMemo(() => {
    return (
      isEmptyString(email) ||
      isEmptyString(password) ||
      isEmptyString(name) ||
      loading
    );
  }, [email, password, name, loading]);

  //   HANDLE FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData: SignupDataType = {
        email: email.trim(),
        password: password.trim(),
        name: name.trim().toLowerCase(),
      };
      // Handle signup logic here
      const result = await createNewUser(formData);

      if (result.error) {
        setError(result.message);
        return;
      }

      setSuccess(result.message);

      const data = result.data;

      if (!data) {
        setError("Impossible de continuer pour l'instant !");
        return;
      }

      // Handle signin logic here
      const res = await signIn("credentials", {
        email: data.email,
        password,
        redirect: false, // important pour ne pas rediriger automatiquement
      });

      if (res?.error) {
        let message = "";
        switch (res.error) {
          case "CredentialsSignin":
            message = "Email ou mot de passe incorrect !";
            break;
          case "Configuration":
            message = "Problème de configuration, contacter un admin !";
            break;
          default:
            message = res.error;
        }
        setError(message);
      } else {
        setSuccess("Bienvenue, " + email + " sur LOBELA");

        router.refresh();
      }
    } catch (error) {
      setError("Une erreur survenue, veuillez reessayer plus tard!");
      console.log("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {/* Name */}
      <div className="relative w-full">
        <Input
          label="Nom complet"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jimmy kabunda"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={loading}
        />
      </div>
      {/* Email */}
      <div className="relative w-full">
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jimmikab@exemple.com"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={loading}
        />
      </div>
      {/* Password */}
      <div className="relative w-full">
        <Input
          label="Mot de passe"
          type={passwordType}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe"
          className="pr-10" // Add padding to the right for the icon
        />
        <button
          type="button"
          onClick={() =>
            setPasswordType(passwordType === "password" ? "text" : "password")
          }
          className="absolute right-3 top-2 transform -translate-y-1/2 text-gray-500"
          tabIndex={-1} // Prevents button from being focusable
        >
          {passwordType === "password" ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      </div>

      {/* ERRORS */}
      {error && <Alert message={error} type="error" />}

      {/* SUCCESS */}
      {success && <Alert message={success} type="success" />}

      <Button type="submit" disabled={isButtonDisabled}>
        {loading && <Loader className="mr-2 animate-spin size-5" />} Inscription
      </Button>

      {/* HAVE ACC ALDY */}
      <div className="text-sm flex flex-wrap gap-x-1 gap-y-0.5 text-gray-400 mt-4">
        <p>Vous avez deja un compte?</p>
        <Link
          href={"/auth/signin"}
          className="text-primary/70 hover:underline
        transition-all duration-300 ease-in-out
        "
        >
          Connexion
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
