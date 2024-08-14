interface VerificationUserByCodeTemplateProps {
  code: string;
}

export const VerificationUserByCodeTemplate: React.FC<VerificationUserByCodeTemplateProps> = ({
  code,
}) => {
  return (
    <div>
      <p>
        Код подтверждения:<h2>{code}</h2>
      </p>
      <p>
        <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
      </p>
    </div>
  );
};
