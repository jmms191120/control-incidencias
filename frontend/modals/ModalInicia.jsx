import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { createIncidencia, updateIncidencia } from "../services/incidenciasService";
import { useState, useEffect } from "react";

export default function ModalIncidencia({ open, setOpen, selected, reload }) {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "Media",
    estado: "Pendiente",
    id_equipo: 1
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({
        titulo: "",
        descripcion: "",
        prioridad: "Media",
        estado: "Pendiente",
        id_equipo: 1
      });
    }
  }, [selected]);

  const handleSubmit = async () => {
    if (selected) {
      await updateIncidencia(selected.id, form);
    } else {
      await createIncidencia(form);
    }

    reload();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selected ? "Editar Incidencia" : "Nueva Incidencia"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <Textarea placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <Input placeholder="Prioridad" value={form.prioridad} onChange={(e) => setForm({ ...form, prioridad: e.target.value })} />
          <Input placeholder="Estado" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} />

          <Button className="w-full" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
