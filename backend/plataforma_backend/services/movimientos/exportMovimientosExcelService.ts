import ExcelJS from 'exceljs';
import { MovimientosRepository } from '../../repositories/movimientos.repository';
import { ExportMovimientosQuery } from '../../schemas/movimiento.schema';

export class ExportMovimientosExcelService {
    /**
     * Genera un archivo Excel (.xlsx) con los movimientos filtrados
     */
    static async execute(filters: ExportMovimientosQuery): Promise<{ buffer: Buffer; fileName: string }> {
        // 1. Obtener los movimientos de la DB
        const movimientos = await MovimientosRepository.getMovimientosExport(filters);

        // 2. Crear el libro de trabajo y la hoja
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Movimientos de Caja');

        // 3. Definir las columnas (Encabezados amigables)
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Fecha', key: 'fecha', width: 15 },
            { header: 'Tipo', key: 'tipo', width: 12 },
            { header: 'Propiedad', key: 'nombre_inmueble', width: 25 },
            { header: 'Concepto', key: 'concepto', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 40 },
            { header: 'Monto', key: 'monto', width: 15 },
            { header: 'Método de Pago', key: 'metodo_pago', width: 15 },
            { header: 'Comprobante', key: 'comprobante', width: 15 },
            { header: 'Reserva', key: 'codigo_reserva', width: 15 },
            { header: 'Plataforma', key: 'plataforma_origen', width: 15 }
        ];

        // Estilo para el encabezado
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // 4. Agregar los datos con formato
        movimientos.forEach((mov) => {
            const row = worksheet.addRow({
                id: mov.id?.substring(0, 8), // ID corto para export
                fecha: mov.fecha,
                tipo: mov.tipo,
                nombre_inmueble: mov.nombre_inmueble || 'N/A',
                concepto: mov.concepto,
                descripcion: mov.descripcion,
                monto: mov.monto,
                metodo_pago: mov.metodo_pago || 'N/A',
                comprobante: mov.comprobante || 'N/A',
                codigo_reserva: mov.codigo_reserva || 'N/A',
                plataforma_origen: mov.plataforma_origen || 'N/A'
            });

            // Lógica de negocio: Si es egreso, el monto en rojo (o valor negativo)
            const montoCell = row.getCell('monto');

            // Aseguramos que el monto sea un número
            const montoValue = Number(mov.monto);

            if (mov.tipo === 'egreso' || mov.tipo === 'deducible') {
                // Opción A: Valor negativo para contabilidad
                montoCell.value = -montoValue;

                // Opción B: Color rojo
                montoCell.font = { color: { argb: 'FFFF0000' }, bold: true };
            } else {
                montoCell.value = montoValue;
            }

            // Formato de moneda
            montoCell.numFmt = '"$"#,##0.00;[Red]"-$"#,##0.00';
        });

        // 5. Generar el buffer
        const bufferData = await workbook.xlsx.writeBuffer();

        // 6. Nombre dinámico
        const today = new Date().toISOString().split('T')[0];
        const fileName = `Reporte_Caja_${today}.xlsx`;

        return {
            buffer: Buffer.from(bufferData),
            fileName
        };
    }
}
