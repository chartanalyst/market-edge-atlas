import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, LogOut, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getSiteContent, resetSiteContentSection, saveSiteContentSection } from "@/lib/content.functions";
import { getAdminStatus } from "@/lib/admin.functions";
import { adminSections, emptyItem, type AdminSection } from "@/lib/admin-schema";
import { defaultSiteContent } from "@/lib/site-content";
import { FieldControl, IconButton } from "@/components/admin/field-control";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title "Content admin — Technical Market Analyst" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return null;
}
