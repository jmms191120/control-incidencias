import { useEffect, useState } from "react";
import { getEquipos, deleteEquipo } from "../services/equiposService";
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../components/ui/table";
import ModalEquipo from "../modals/ModalEquipo";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await getEquipos();
    setEquipos(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Equipos</h1>
        <Button onClick={() => { setSelected(null); setOpen(true); }}>Nuevo equipo</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipos.map((e) => (
            <TableRow key={e.id}>
              <TableCell>{e.nombre}</TableCell>
              <TableCell>{e.tipo}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => { setSelected(e); setOpen(true); }}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteEquipo(e.id).then(load)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalEquipo open={open} setOpen={setOpen} selected={selected} reload={load} />
    </div>
  );
}
