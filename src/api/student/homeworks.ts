import {type Account, type Session, SessionTokenRequired, ComingHomework} from "~/models";
import {Request} from "~/core/request";
import {decodeComingHomework, decodeHomework} from "~/decoders/homework";
import {Homework} from "~/models";

export const studentHomeworks = async (
    session: Session,
    account: Account,
    date: string
): Promise<Homework[]> => {
    if (!session.token)
        throw new SessionTokenRequired();

    const request = new Request(`/Eleves/${account.id}/cahierdetexte/${date}.awp?verbe=get&v=4.62.1`)
        .addVersionURL()
        .setToken(session.token)
        .setFormData({});
    const response = await request.send(session.fetcher);
    session.token = response.token;
    return response.data.matieres.map(decodeHomework);
};


export const studentComingHomeworks = async (
    session: Session,
    account: Account
): Promise<{ date: Date, homeworks: ComingHomework[] }[]> => {
    if (!session.token)
        throw new SessionTokenRequired();

    const request = new Request(`/Eleves/${account.id}/cahierdetexte.awp?verbe=get`)
        .addVersionURL()
        .setToken(session.token)
        .setFormData({});

    const response = await request.send(session.fetcher);
    session.token = response.token;
    return Object.keys(response.data).map((date: string) => {
        return {
            date: new Date(date),
            homeworks: response.data[date].map(decodeComingHomework)
        };
    });

};
