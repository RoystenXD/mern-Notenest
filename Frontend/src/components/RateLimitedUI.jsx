import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-red-700">
            <ZapIcon size={64} className="mb-4 text-red-500" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold mb-2">Rate Limit Reached</h2>
            <p className="text-center">
                You have exceeded the maximum number of requests.<br />
                Please try again later.
            </p>
        </div>
    );
};

export default RateLimitedUI;