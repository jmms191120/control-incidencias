import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/usuariosService";
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "../components/ui/table";
import ModalUsuario from "../modals/ModalUsuario";

export default function Usuarios() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    const res = await getUsuarios();
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Usuarios</h1>
        <Button onClick={() => { setSelected(null); setOpen(true); }}>Nuevo usuario</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.nombre}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.rol}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" onClick={() => { setSelected(u); setOpen(true); }}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteUsuario(u.id).then(load)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ModalUsuario open={open} setOpen={setOpen} selected={selected} reload={load} />
    </div>
  );
}
