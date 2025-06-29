"use client";

import React, { ElementType } from 'react';

import {
  ProfilAccountTypeSvgIcon,
  ProfileLocationSvgIcon,
  ProfilEmailSvgIcon,
  ProfileNameSvgIcon,
  ProfilMoreAccountSvgIcon,
  ProfilPhoneSvgIcon,
  ProfilPubNameSvgIcon,
} from '@/app/svg_components/SvgIcons';
// import {
//   Code,
//   Mail,
//   MapPin,
//   Phone,
//   // User,
//   UserCircle,
//   Users,
// } from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { useUser } from '@/hooks/useAuth.hook';

interface StatItemProps {
  value: string;
  label: string;
}

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col flex-1 items-center p-4 border-b-2">
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-center text-gray-600 text-sm">{label}</div>
    </div>
  );
}

interface ProfileItemProps {
  icon: ElementType; // typeof User;
  text: string;
}

function ProfileItem({ icon: Icon, text }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon className="h-5 w-5 text-gray-500" />
      <span className="text-gray-900">{text}</span>
    </div>
  );
}

const ProfileModule = () => {
  const { userNow, isLoading, error } = useUser();
  // const { getLocalStorage } = useGetLocalStorage();
  console.log('ProfileModule user:', userNow, isLoading, error);
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Grid */}
      <Card className="md:col-span-1 border-[1.5px] border-primaryAppearance">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 ">
            <StatItem value="9.3K" label="Contacts" />
            <StatItem value="12" label="Groupes" />
            <StatItem value="1.2K" label="Messages envoyés" />
            <StatItem value="50" label="Messages échoués" />
            <StatItem value="6" label="Recharges actuelles" />
            <StatItem value="248" label="Messages Restants" />
            <StatItem value="0" label="Messages envoyés actu" />
            <StatItem value="0" label="Messages échoués actu" />
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card className="md:col-span-1 border-[1.5px] border-primaryAppearance">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Informations du compte</h2>
          <div className="space-y-2">
            <ProfileItem icon={ProfileNameSvgIcon} text="Chris Kody" />
            <ProfileItem icon={ProfileLocationSvgIcon} text="Yaoundé - Cameroun" />
            <ProfileItem icon={ProfilEmailSvgIcon} text="imagichris0@gmail.com" />
            <ProfileItem icon={ProfilAccountTypeSvgIcon} text="Compte Particulier" />
            <ProfileItem icon={ProfilPhoneSvgIcon} text="659 19 25 19" />
            <ProfileItem icon={ProfilMoreAccountSvgIcon} text="Sous compte : 0" />
            <ProfileItem icon={ProfilPubNameSvgIcon} text="Nom de publicité: Imagichris" />
          </div>
        </CardContent>
      </Card>

      {/* API Key Details */}
      <Card className="md:col-span-1 border-[1.5px] border-primaryAppearance">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Détails développeur - API Key</h2>
          <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              <span className="text-pink-400">function</span>{" "}
              <span className="text-purple-400">MyComponent</span>
              <span className="text-white">(props) {`{`}</span>
              <br />
              <span className="text-pink-400 ml-4">return</span> (
              <br />
              <span className="ml-8 text-green-400">{`<div>`}</span>
              <br />
              <span className="ml-12 text-green-400">{`<div>`}</span> Hello,{" "}
              {`{`} props.name {`}`}
              <span className="text-green-400">{`</div>`}</span>
              <br />
              <span className="ml-12 text-green-400">{`<p>`}</span> Good to see you{" "}
              <span className="text-green-400">{`</p>`}</span>
              <br />
              <span className="ml-8 text-green-400">{`</div>`}</span>
              <br />
              );
              <br />
              {`}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileModule