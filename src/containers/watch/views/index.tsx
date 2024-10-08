"use client";

import { EmptyScreen } from "@/components";
import { CaretRightOutlined, HomeOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { isEmpty, map } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";

type Movie = {
  id: string;
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  episodes: any[];
};

type Props = {
  movieDetail: Movie;
  episode: any;
};

export const Watch: React.FC<Props> = ({ movieDetail, episode }) => {
  const [currentEpisode, setCurrentEpisode] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempEpisode = movieDetail?.episodes[0]?.items.find(
      (item: any) => item.name.toLowerCase() === episode
    );
    setCurrentEpisode(tempEpisode);
    setLoading(false);
  }, [episode]);

  return (
    <div>
      <div className="container">
        <div className="w-full bg-[#222222] px-3 py-2 rounded-md mb-3 flex items-center gap-3 text-white flex-wrap">
          <Link
            href={`/`}
            className="no-underline text-zinc-400 hover:text-[#e74c3c]"
          >
            <HomeOutlined /> Trang chủ
          </Link>
          <CaretRightOutlined className="text-zinc-400" />
          <Link
            href={`/detail/${movieDetail?.slug}`}
            className="no-underline text-zinc-400 hover:text-[#e74c3c]"
          >
            {movieDetail?.name}
          </Link>
          <CaretRightOutlined />
          <div>
            Tập <span className="uppercase">{episode}</span>
          </div>
        </div>
        <div className="flex justify-center">
          {loading ? (
            <Spin />
          ) : (
            <div className="relative overflow-hidden w-[65%] pt-[40%] mb-3 mt-6">
              <iframe
                title={`tap-${episode}`}
                src={
                  isEmpty(movieDetail?.episodes[0]?.items)
                    ? ""
                    : `${currentEpisode?.embed}`
                }
                allowFullScreen
                className="absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-md"
              ></iframe>
            </div>
          )}
        </div>
        <div className="bg-[#222222] p-4 mt-3">
          <h3 className="text-white mb-3 uppercase">Danh sách tập</h3>

          {!movieDetail?.episodes[0]?.items ||
          movieDetail?.episodes[0]?.items.length === 0 ? (
            <div className="flex justify-center">
              <EmptyScreen description="Hiện tại chưa có tập phim nào để phát" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[500px] scroll-smooth snap-y snap-mandatory max-md:justify-center max-md:max-h-[250px]">
              {map(movieDetail?.episodes[0]?.items, (movieEpisode, index) => {
                const isActive =
                  episode.toString() === movieEpisode.name.toLowerCase();

                return (
                  <Link
                    key={index}
                    href={`/watch/${
                      movieDetail?.slug
                    }?tap=${movieEpisode.name.toLowerCase()}`}
                    className={`no-underline text-white hover:opacity-70 rounded px-5 py-1 text-center w-[100px] ${
                      isActive ? "bg-[#e74c3c]" : "bg-neutral-700"
                    }`}
                  >
                    {movieEpisode.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
