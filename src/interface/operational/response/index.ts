export interface IGetOperationalResponse {
    id: number,
    transaksi_id: number | null,
    name: string,
    amount: string,
    description: string,
    status: "success" | "failed" | "pending",
    deleted_at: string | null,
    created_at: string,
    updated_at: string
}