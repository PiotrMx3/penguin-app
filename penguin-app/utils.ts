import { Response, Request, NextFunction } from "express";

export function penguinUtility(req: Request, res: Response, next: NextFunction) {
    res.locals.calculatePenguinAge = (birthYear: number, currentYear: number = 2025): number => {
    if (!Number.isInteger(birthYear) || !Number.isInteger(currentYear)) {
        throw new Error('Both birthYear and currentYear must be integers.');
    }

    if (birthYear > currentYear) {
        throw new Error('Birth year cannot be in the future.');
    }

    if (birthYear < 1900) {
        throw new Error('Birth year is unrealistically old for a penguin.');
    }

    return currentYear - birthYear;
}
    next();
}

