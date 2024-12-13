const Tabla = ({ headers, data }: { headers: string[]; data: any[] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No hay datos disponibles para mostrar.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.full_name}</td>
            <td>{item.legajo}</td>
            <td>{item.dni}</td>
            <td>{item.estado}</td>
            <td>{item.anio_ingreso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;
