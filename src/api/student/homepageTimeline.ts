import { type Account, HomepageTimelineItem, type Session, SessionTokenRequired } from "~/models";
import { decodeHomepageTimelineItem } from "~/decoders/homepage-timeline-item";
import { Request } from "~/core/request";

export const studentHomepageTimeline = async (session: Session, account: Account): Promise<Array<HomepageTimelineItem>> => {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = new Request(`/E/${account.id}/timelineAccueilCommun.awp?verbe=get`)
    .addVersionURL()
    .setToken(session.token)
    .setFormData({});

  const response = await request.send(session.fetcher);
  session.token = response.token;

  return response.data.postits.map(decodeHomepageTimelineItem);
};
