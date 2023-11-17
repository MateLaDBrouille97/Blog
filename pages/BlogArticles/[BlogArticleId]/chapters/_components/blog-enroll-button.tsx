"use client";

import React from 'react';
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "../../../../../components/ui/button";
import { formatPrice } from "../../../../../lib/format";

// interface CourseEnrollButtonProps {
//   price: number;
//   blogarticleId: string;
// }

export default function BlogArticleEnrollButton ({
  price,
  blogarticleId,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${blogarticleId}/checkout`)

      window.location.assign(response.data.url);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}