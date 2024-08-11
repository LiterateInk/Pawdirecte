import { type Account, type Session, SessionTokenRequired, type TimelineItem } from "~/models";
import { decodeTimelineItem } from "~/decoders/timeline-item";
import { Request } from "~/core/request";

export const studentTimeline = async (session: Session, account: Account): Promise<Array<TimelineItem>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/eleves/${account.id}/timeline.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  return response.data.map(decodeTimelineItem);
};
