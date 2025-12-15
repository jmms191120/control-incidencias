import { useEffect, useState } from "react";
import { getIncidencias, deleteIncidencia } from "../services/incidenciasService";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import ModalIncidencia from "../modals/ModalIncidencia";

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await getIncidencias();
    setIncidencias(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const eliminar = async (id) => {
    await deleteIncidencia(id);
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Incidencias</h1>
        <Button onClick={() => { setSelected(null); setOpen(true); }}>Nueva Incidencia</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidencias.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.codigo_incidencia}</TableCell>
              <TableCell>{i.titulo}</TableCell>
              <TableCell>{i.prioridad}</TableCell>
              <TableCell>{i.estado}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => { setSelected(i); setOpen(true); }}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => eliminar(i.id)}>Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalIncidencia open={open} setOpen={setOpen} selected={selected} reload={loadData} />
    </div>
  );
}
