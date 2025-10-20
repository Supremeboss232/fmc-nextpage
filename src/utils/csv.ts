export function exportToCsv(filename: string, rows: Record<string, any>[], columns: string[]) {
  if (!rows || rows.length === 0) {
    const blob = new Blob([''], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    return;
  }
  const header = columns.join(',');
  const data = rows
    .map((r) =>
      columns
        .map((c) => {
          const val = r[c] ?? '';
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    )
    .join('\n');
  const csv = `${header}\n${data}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
