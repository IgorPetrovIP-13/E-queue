import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { CalendarPlus, TvMinimalPlay } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/common/enums/routes-enum";

const WelcomePage = () => {
  return (
    <section className="flex flex-col gap-40 max-w-[1440px] m-auto">
      <div className="flex justify-center gap-40 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl text-default-500">
            Ласкаво просимо до E-queue
          </h1>
          <h2 className="text-5xl max-w-[800px]">
            Об’єднуємо людей і можливості. Розумне керування чергами й записами
            — для бізнесу нового покоління
          </h2>
          <p className="max-w-[800px] text-lg text-default-700">
            Ми допомагаємо нашим клієнтам створювати справді винятковий досвід
            для споживачів і працівників, а також забезпечувати більш злагоджену
            та ефективну роботу.
          </p>
          <Button
            as={Link}
            className="text-lg"
            color="primary"
            href={ROUTES.SIGN_UP}
            size="lg"
            variant="shadow"
          >
            Розпочати свій шлях разом з E-queue
          </Button>
        </div>
        <div>
          <Image
            isBlurred
            src="/image.png"
            width={400}
          />
        </div>
      </div>
      <Card>
        <CardHeader className="flex justify-center items-center flex-col gap-4">
          <h3 className="text-xl font-bold text-center max-w-[400px] mt-4">
            Усе необхідне для бездоганного шляху вашого клієнта — в одному
            рішенні
          </h3>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-4">
          <div className="flex flex-col border gap-4 p-10 border-default-200 rounded-xl hover:bg-default-100 transition-colors cursor-pointer">
            <CalendarPlus
              className="text-primary-600 mx-auto"
              size={80}
            />
            <p className="text-center text-2xl font-bold">Слотові статичні черги</p>
            <p className="text-default-500 text-lg">
              Клієнт бронює вільний часовий інтервал (тайм-слот) і приходить у
              визначений час, мінімізуючи очікування.
            </p>
          </div>
          <div className="flex flex-col border gap-4 p-10 border-default-200 rounded-xl hover:bg-default-100 transition-colors cursor-pointer">
            <TvMinimalPlay
              className="text-primary-600 mx-auto"
              size={80}
            />
            <p className="text-center text-2xl font-bold">Живі черги</p>
            <p className="text-default-500 text-lg">
              Клієнт приходить без попереднього запису. Адміністратор реєструє
              його в системі, після чого користувач бачить свій номер у черзі,
              скільки людей перед ним та орієнтовний час очікування.
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default WelcomePage;
