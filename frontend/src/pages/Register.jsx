import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const submit = async () => {
    await register(form);
    alert("Registro exitoso");
    nav("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px] shadow-xl">
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Crear Cuenta</h2>

          <Input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <Input
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button className="w-full" onClick={submit}>
            Registrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
