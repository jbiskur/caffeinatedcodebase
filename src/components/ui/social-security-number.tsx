import {type FC} from "react";

export type SocialSecurityNumberProps = {
  socialSecurityNumber: string;
}

export const SocialSecurityNumber: FC<SocialSecurityNumberProps> = ({
  socialSecurityNumber,
                                                                    }) => {
  return (
    <span>
      {socialSecurityNumber.slice(0, 6)}-{socialSecurityNumber.slice(6, 10)}
    </span>
  );
}
