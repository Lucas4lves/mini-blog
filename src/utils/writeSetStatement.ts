export function writeUpdateStatetement(fields : string[]) : string {
    const stmt = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
    return stmt;
}