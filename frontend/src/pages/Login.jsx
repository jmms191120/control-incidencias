import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    try {
      const res = await login(form);

      // Guardar sesión (SIN PROTEGER RUTAS)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.user));

      nav("/"); // Dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || "Credenciales incorrectas"
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px] shadow-xl">
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Iniciar Sesión</h2>

          <Input
            placeholder="Correo"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />

          <Input
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Button className="w-full" onClick={submit}>
            Entrar
          </Button>

          <p className="text-sm text-center text-gray-600">
            ¿No tienes cuenta?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => nav("/register")}
            >
              {" "}Regístrate
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
