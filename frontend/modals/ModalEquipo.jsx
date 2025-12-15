import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { createEquipo, updateEquipo } from "../services/equiposService";

export default function ModalEquipo({ open, setOpen, selected, reload }) {
  const [form, setForm] = useState({ nombre: "", tipo: "" });

  useEffect(() => {
    selected ? setForm(selected) : setForm({ nombre: "", tipo: "" });
  }, [selected]);

  const submit = async () => {
    selected ? await updateEquipo(selected.id, form) : await createEquipo(form);
    reload();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader><DialogTitle>Equipo</DialogTitle></DialogHeader>

        <div className="space-y-3">
          <Input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <Input placeholder="Tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} />

          <Button className="w-full" onClick={submit}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
