import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hwljvreyautrqwyyassp.supabase.co";
const supabaseKey = process.env["SUPABASE_KEY"];
if (!supabaseKey) {
	throw new Error(
		"No supabase key found. Please set the SUPABASE_KEY environment variable."
	);
}
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
