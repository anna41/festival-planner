export function exportCsv(
    fileName: string,
    rows: Record<string, string | number>[]
) {
    if (rows.length === 0) {
        return;
    }

    const headers = Object.keys(rows[0]);

    const csvRows = [
        headers.join(","),
        ...rows.map((row) =>
            headers
                .map((header) => {
                    const value = row[header];

                    return `"${String(value).replace(/"/g, '""')}"`;
                })
                .join(",")
        ),
    ];

    const csv = csvRows.join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}