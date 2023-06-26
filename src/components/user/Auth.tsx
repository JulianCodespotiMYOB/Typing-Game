// components/user/Auth.tsx

import {createClient} from '@supabase/supabase-js'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'

// Initialize the Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const UserAuth = () => {
    return (
        <Auth
            supabaseClient={supabase}
            appearance={{theme: ThemeSupa}}
            providers={['google', 'facebook', 'twitter']}
        />
    );
};

export default UserAuth;
