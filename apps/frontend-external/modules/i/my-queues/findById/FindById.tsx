"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ROUTES } from "@/common/enums/routes-enum";

export default function FindById() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Search size={20} />
        <h1 className="text-md">Знайти чергу за ID, наданим організацією</h1>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 items-end">
        <Input
					label="ID черги"
          placeholder="наприклад: 6824ba8874a48457360871ba"
          value={inputValue}
					onChange={e => setInputValue(e.target.value)}
        />
        <Button
          as={Link}
          className="w-fit"
          color="primary"
          href={`${ROUTES.STATIC_QUEUE}/${inputValue}`}
          isDisabled={inputValue.length < 24}
        >
          Перейти на сторінку черги
        </Button>
      </CardBody>
    </Card>
  );
}
