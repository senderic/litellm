import React from "react";

import { Switch } from "@/components/ui/switch";

import type { ComplexityRouterConfigValue } from "./ComplexityRouterConfig";
import { DEFAULT_DEPLOYMENT_AFFINITY, DEFAULT_SESSION_AFFINITY } from "./ComplexityRouterConfig";
import { restrictedBy } from "./TierRestrictions";

export const AffinityControls: React.FC<{
  value: ComplexityRouterConfigValue;
  onChange: (value: ComplexityRouterConfigValue) => void;
}> = ({ value, onChange }) => (
  <>
    <div className="flex items-center gap-2 mb-2">
      <Switch
        checked={value.deployment_affinity ?? DEFAULT_DEPLOYMENT_AFFINITY}
        onCheckedChange={(deploymentAffinity) => onChange({ ...value, deployment_affinity: deploymentAffinity })}
        aria-label="Pin a session to one deployment per model group"
      />
      <strong className="font-semibold">Pin a session to one deployment per model group</strong>
    </div>
    <span className="block text-xs mb-3 text-muted-foreground">
      Keeps a session on the same deployment within a group, so provider prompt caches stay warm. Turn off to
      load-balance every turn.
    </span>
    <div className="flex items-center gap-2 mb-2">
      <Switch
        checked={value.custom_tier_set ? false : value.session_affinity ?? DEFAULT_SESSION_AFFINITY}
        disabled={Boolean(value.custom_tier_set)}
        onCheckedChange={(sessionAffinity) => onChange({ ...value, session_affinity: sessionAffinity })}
        aria-label="Pin a session to its first model"
      />
      <strong className="font-semibold">Pin a session to its first model</strong>
    </div>
    <span className="block text-xs text-muted-foreground">
      {restrictedBy(value, "sessionAffinity")?.reason ??
        "Keeps a session on its first turn's model instead of re-classifying each turn. Also pins the deployment."}
    </span>
  </>
);
