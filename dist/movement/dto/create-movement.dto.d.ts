export declare class CreateMovementDto {
    readonly currency: string;
    readonly type: string;
    readonly total: number;
    readonly operator: string;
    readonly reason?: string;
}
export declare class CreateMovementsDto {
    movements: [CreateMovementDto];
}
