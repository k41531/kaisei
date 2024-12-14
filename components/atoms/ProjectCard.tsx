interface ProjectCardProps {
  href: string;
  alt: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  imgAlt: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <a href={props.href} alt={props.alt}>
      <div class="rounded-md aspect-1/1">
        <div class="grid grid-rows-5">
          <div class="row-span-2 p-2">
            <p>{props.title}</p>
            <p class="text-xs whitespace-nowrap">{props.subtitle}</p>
          </div>
          <img
            class="row-span-2 h-full mx-auto"
            src={props.imgSrc}
            alt={props.imgAlt}
          />
        </div>
      </div>
    </a>
  );
}
