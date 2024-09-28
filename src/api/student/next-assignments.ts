import { type Account, HomepageTimelineItem, type Session, SessionTokenRequired } from "~/models";
import { decodeHomepageTimelineItem } from "~/decoders/homepage-timeline-item";
import { Request } from "~/core/request";
import { APIAssignment } from "~/models/assignments";
import { APINextAssignmentsResponse, NextAssignments } from "~/models/next-assignments";
import { decodeNextAssignments } from "~/decoders/next-assignments";
import { ResponseHTML } from "./assignment";

export const getNextAssignments = async (session: Session, account: Account): Promise<NextAssignments[]> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/Eleves/${account.id}/cahierdetexte.awp?verbe=get&v=4.62.1`)
    .setToken(session.token)
    .setFormData({});

  const response = await request.sendRaw(session.fetcher);
  const responseHTML = new ResponseHTML(response);
  session.token = responseHTML.token;

  return Object.keys(responseHTML.data).map((date: string) => {
    return {
      date: new Date(date),
      assignments: responseHTML.data[date].map(decodeNextAssignments)
    };
  });

};
