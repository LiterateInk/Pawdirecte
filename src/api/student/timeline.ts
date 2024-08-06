import { encodeRequest, encodeRequestFormData, encodeRequestToken } from "~/encoders/request";
import { encodeEDResponse } from "~/encoders/ed-response";
import { Account, Session, SessionTokenRequired } from "~/models";
import TimelineItem from "~/parsers/TimelineItem";

export async function studentTimeline (session: Session, account: Account): Promise<Array<TimelineItem>> {
  if (!session.token)
    throw new SessionTokenRequired();

  const request = encodeRequest(`/eleves/${account.id}/timeline.awp?verbe=get`);
  encodeRequestFormData(request, {});
  encodeRequestToken(request, session.token);

  const raw_response = await session.fetcher(request);
  const response = encodeEDResponse(raw_response);
  session.token = response.token;

  return response.data.map((item: any) => new TimelineItem(item));
}
