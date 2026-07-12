import { CareTag } from "@/components/CareTag";
import { ApprovalCard } from "@/components/app/ApprovalCard";
import { EmptySlot } from "@/components/app/EmptySlot";
import { getOpenApprovals } from "@/lib/data";
import { brand } from "@/brand.config";

/** The signature surface: everything planned, nothing ships unseen. */
export default async function ApprovalsPage() {
  const approvals = await getOpenApprovals();

  return (
    <div className="mx-auto max-w-3xl">
      <CareTag>Approvals</CareTag>
      <h1 className="subhead mt-2">Your queue.</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
        {brand.promise} Approve it, or send it back with a note — either
        way it takes seconds.
      </p>

      <div className="mt-8 flex flex-col gap-5">
        {approvals.length === 0 && (
          <EmptySlot title="Queue's clear">
            New drafts land here before they ship. You&apos;ll get an email
            the moment one needs you.
          </EmptySlot>
        )}
        {approvals.map(({ approval, item }) => (
          <ApprovalCard key={approval.id} approval={approval} item={item} />
        ))}
      </div>
    </div>
  );
}
