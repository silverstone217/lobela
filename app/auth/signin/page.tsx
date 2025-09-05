import SigninForm from "@/components/forms/SigninForm";
import React from "react";

function SignIn() {
  return (
    <div
      className="p-6 flex flex-col gap-6 max-w-sm mx-auto w-full h-full 
    justify-center
    overflow-y-auto
    "
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Connexion au compte</h1>
        <p className="text-foreground/80 mb-6">
          Re-Bonjour sur <span className="text-primary">Lobela</span> et
          profiter des belles histoires dès {`maintenant`}!
        </p>
      </div>
      {/* Formulaire d'inscription */}
      <SigninForm />
    </div>
  );
}
export default SignIn;
