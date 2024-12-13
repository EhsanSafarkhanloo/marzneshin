import { fetch } from '@marzneshin/common/utils';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type AdminStateType = {
    isLoggedIn: () => Promise<boolean>,
    getAuthToken: () => string | null;
    isSudo: () => boolean;
    balance: () => number;
    setAuthToken: (token: string) => void;
    removeAuthToken: () => void;
    setSudo: (isSudo: boolean) => void;
    //setBalance: (b: number) => void;
}

export const useAuth = create(
    subscribeWithSelector<AdminStateType>(() => ({
        isLoggedIn: async () => {
            try {
                let res = await fetch('/admins/current');
                localStorage.setItem('balance', String(res.balance));
                return true;
            } catch (error) {
                return false;
            }
        },
        getAuthToken: () => {
            return localStorage.getItem('token');
        },
        isSudo: () => {
            const isSudo = localStorage.getItem('is-sudo')
            return isSudo === "true";
        },
        setSudo: (isSudo) => {
            localStorage.setItem('is-sudo', String(isSudo));
        },
        balance: () => {
            let userbalance = localStorage.getItem('balance');
            if (userbalance != null)
                return parseInt(userbalance);
            else return 0;
        },
        setAuthToken: (token: string) => {
            localStorage.setItem('token', token);
        },
        removeAuthToken: () => {
            localStorage.removeItem('token');
        },
    }))
)
